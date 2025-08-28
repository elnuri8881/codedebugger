package com.project.CodeDebugger.controller;

import com.project.CodeDebugger.model.CodeRequest;
import com.project.CodeDebugger.service.CodeAnalysisService;

import reactor.core.publisher.Mono;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://127.0.0.1:5500") 
public class CodeAnalysisController {

    private final CodeAnalysisService codeAnalysisService;

    @Autowired
    public CodeAnalysisController(CodeAnalysisService codeAnalysisService) {
        this.codeAnalysisService = codeAnalysisService;
    }

    @PostMapping("/analyze")
    @ResponseStatus(code = HttpStatus.OK)
    public Mono<String> analyzeCode(@RequestBody CodeRequest request) {
        return codeAnalysisService.analyzeCode(request.getCode());  // Call the service to analyze the code
    }
}
