package com.project.CodeDebugger.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class CodeAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String code; // Store the code that needs to be analyzed

    @Column(nullable = false)
    private String result; // Store the analysis result (bugs, optimizations, etc.)

    // Constructors
    public CodeAnalysis() {
    }

    public CodeAnalysis(String code, String result) {
        this.code = code;
        this.result = result;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    @Override
    public String toString() {
        return "CodeAnalysis{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", result='" + result + '\'' +
                '}';
    }
}
