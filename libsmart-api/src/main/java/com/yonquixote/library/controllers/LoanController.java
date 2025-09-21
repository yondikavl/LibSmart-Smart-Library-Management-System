package com.yonquixote.library.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yonquixote.library.dto.LibraryStatsDTO;
import com.yonquixote.library.models.Loan;
import com.yonquixote.library.services.LoanService;

@RestController
@RequestMapping("/loans")
public class LoanController {

    private final LoanService service;

    public LoanController(LoanService service) {
        this.service = service;
    }

    @PostMapping("/borrow")
    public Loan borrowBook(@RequestParam Long bookId, @RequestParam Long memberId,
            @RequestParam(defaultValue = "7") int durationDays) {
        return service.borrowBook(bookId, memberId, durationDays);
    }

    @PostMapping("/return")
    public Loan returnBook(@RequestParam Long loanId) {
        return service.returnBook(loanId);
    }

    @GetMapping("/active")
    public List<Loan> getActiveLoans() {
        return service.getActiveLoans();
    }

    @GetMapping("/history")
    public List<Loan> getLoanHistory() {
        return service.getLoanHistory();
    }

    @GetMapping("/history/member/{memberId}")
    public List<Loan> getLoanHistoryByMember(@PathVariable Long memberId) {
        return service.getLoanHistoryByMember(memberId);
    }

    @GetMapping("/active/member/{memberId}")
    public List<Loan> getActiveLoansByMember(@PathVariable Long memberId) {
        return service.getActiveLoansByMember(memberId);
    }

    @GetMapping("/stats")
    public LibraryStatsDTO getLibraryStats() {
        return service.getLibraryStats();
    }

}
