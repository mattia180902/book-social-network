package com.sincon.book.feedback;

import com.sincon.book.book.Book;
import com.sincon.book.common.BaseEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Feedback extends BaseEntity {

    private Double note; //1-5 stars
    private String comment;

    @ManyToOne
    @JoinColumn(name="book_id")
    private Book book;
}
