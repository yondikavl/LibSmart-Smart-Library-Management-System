package com.yonquixote.library.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.yonquixote.library.dto.LibraryStatsDTO;
import com.yonquixote.library.models.Book;
import com.yonquixote.library.models.Loan;
import com.yonquixote.library.models.Member;
import com.yonquixote.library.repositories.BookRepository;
import com.yonquixote.library.repositories.LoanRepository;
import com.yonquixote.library.repositories.MemberRepository;

@Service
public class LoanService {

    private final BookRepository bookRepo;
    private final MemberRepository memberRepo;
    private final LoanRepository loanRepo;

    public LoanService(BookRepository bookRepo, MemberRepository memberRepo,
            LoanRepository loanRepo) {
        this.bookRepo = bookRepo;
        this.memberRepo = memberRepo;
        this.loanRepo = loanRepo;
    }

    public Loan borrowBook(Long bookId, Long memberId, int durationDays) {
        Book book = bookRepo.findById(bookId).orElseThrow();
        if (!book.isAvailable()) {
            throw new RuntimeException("Buku sedang dipinjam!");
        }

        Member member = memberRepo.findById(memberId).orElseThrow();

        Loan loan = new Loan();
        loan.setBook(book);
        loan.setMember(member);
        loan.setLoanDate(LocalDate.now());
        loan.setDurationDays(durationDays);
        loan.setDueDate(LocalDate.now().plusDays(durationDays));

        book.setAvailable(false);
        bookRepo.save(book);

        return loanRepo.save(loan);
    }

    public Loan returnBook(Long loanId) {
        Loan loan = loanRepo.findById(loanId).orElseThrow();
        Book book = loan.getBook();

        loan.setReturnDate(LocalDate.now());

        if (loan.getDueDate() != null && loan.getReturnDate().isAfter(loan.getDueDate())) {
            long daysLate = java.time.temporal.ChronoUnit.DAYS.between(loan.getDueDate(), loan.getReturnDate());

            int fine = 0;
            if (daysLate >= 1) {
                fine = 5000;
                if (daysLate > 1) {
                    fine += (daysLate - 1) * 1000;
                }
            }
            loan.setFine(fine);
        } else {
            loan.setFine(0);
        }

        book.setAvailable(true);
        bookRepo.save(book);

        return loanRepo.save(loan);
    }

    public List<Loan> getActiveLoans() {
        return loanRepo.findByReturnDateIsNull();
    }

    public List<Loan> getLoanHistory() {
        return loanRepo.findByReturnDateIsNotNull();
    }

    public List<Loan> getLoanHistoryByMember(Long memberId) {
        return loanRepo.findByMemberIdAndReturnDateIsNotNull(memberId);
    }

    public List<Loan> getActiveLoansByMember(Long memberId) {
        return loanRepo.findByMemberIdAndReturnDateIsNull(memberId);
    }

    public LibraryStatsDTO getLibraryStats() {
        long totalBooks = bookRepo.count();
        long availableBooks = bookRepo.findAll().stream().filter(Book::isAvailable).count();
        long borrowedBooks = totalBooks - availableBooks;
        long totalMembers = memberRepo.count();
        long activeLoans = loanRepo.findByReturnDateIsNull().size();
        long finishedLoans = loanRepo.findByReturnDateIsNotNull().size();

        return new LibraryStatsDTO(
                totalBooks,
                availableBooks,
                borrowedBooks,
                totalMembers,
                activeLoans,
                finishedLoans);
    }

}
