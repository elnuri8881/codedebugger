package com.project.CodeDebugger.service;

import com.project.CodeDebugger.utility.OpenAIClient;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class CodeAnalysisService {

    private final OpenAIClient openAIClient;

    @Autowired
    public CodeAnalysisService(OpenAIClient openAIClient) {
        this.openAIClient = openAIClient;
    }

    // Method to analyze the code and extract only the content from OpenAI's response
    public Mono<String> analyzeCode(String code) {
        return openAIClient.analyzeCode(code)
                .map(response -> extractContentFromResponse(response));
    }

    // Method to extract only the 'content' field from the OpenAI response
    private String extractContentFromResponse(String jsonResponse) {
        try {
            // Parse the JSON response using Jackson's ObjectMapper
            JsonNode responseNode = new com.fasterxml.jackson.databind.ObjectMapper().readTree(jsonResponse);

            // Extract the content field from the response
            JsonNode contentNode = responseNode.path("choices")
                                              .get(0)
                                              .path("message")
                                              .path("content");

            // Return only the content (without any additional metadata)
            return contentNode.asText();  // Just the content, as plain text

        } catch (Exception e) {
            e.printStackTrace();
            return "Error extracting content"; // Handle errors gracefully
        }
    }
}
