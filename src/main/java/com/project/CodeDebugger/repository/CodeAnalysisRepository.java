package com.project.CodeDebugger.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.project.CodeDebugger.model.CodeAnalysis;

@Repository
public interface CodeAnalysisRepository extends JpaRepository<CodeAnalysis, Long> {
    // You can add custom queries if necessary
}
