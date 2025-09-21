package com.yonquixote.library.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LibraryStatsDTO {
    private long totalBooks;
    private long availableBooks;
    private long borrowedBooks;
    private long totalMembers;
    private long activeLoans;
    private long finishedLoans;
}
