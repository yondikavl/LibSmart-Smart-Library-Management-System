package com.yonquixote.library.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.yonquixote.library.models.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

}
