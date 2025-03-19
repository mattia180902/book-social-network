package com.sincon.book.history;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookTransactionHistoryRepository extends JpaRepository<BookTransactionHistory, Integer> {

}
