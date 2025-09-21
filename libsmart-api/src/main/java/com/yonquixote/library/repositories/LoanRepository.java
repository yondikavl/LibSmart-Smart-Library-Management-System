package com.yonquixote.library.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.yonquixote.library.models.Loan;

public interface LoanRepository extends JpaRepository<Loan, Long> {
    List<Loan> findByReturnDateIsNull();

    List<Loan> findByReturnDateIsNotNull();

    List<Loan> findByMemberIdAndReturnDateIsNotNull(Long memberId);

    List<Loan> findByMemberIdAndReturnDateIsNull(Long memberId);
}
