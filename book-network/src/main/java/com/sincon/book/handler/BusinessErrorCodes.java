package com.sincon.book.handler;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.HttpStatus;

import lombok.Getter;

public enum BusinessErrorCodes {
    
    NO_CODE(0,NOT_IMPLEMENTED, "No code"),
    INCORRECT_CURRENT_PASSWORD(300,BAD_REQUEST, "Invalid current password"),
    NEW_PASSWORD_DOES_NOT_MATCH(301 ,BAD_REQUEST, "New password does not match"),
    ACCOUNT_LOCKED(302, FORBIDDEN,"User account is locked"),
    ACCOUNT_DISABLED(303, FORBIDDEN, "User account is disabled"),
    BAD_CREDENTIALS(304, FORBIDDEN, "login and / or passord is incorrect");
    
    @Getter
    private final int code;

    @Getter
    private final HttpStatus httpStatus;

    @Getter
    private final String description;

    private BusinessErrorCodes(int code, HttpStatus httpStatus, String description) {
        this.code = code;
        this.httpStatus = httpStatus;
        this.description = description;
    }
}
