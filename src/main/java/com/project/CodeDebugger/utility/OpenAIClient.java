package com.project.CodeDebugger.utility;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.Map;

@Component
public class OpenAIClient {

    private final WebClient webClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${spring.ai.openai.api-key}")
    private String apiKey;

    public OpenAIClient(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.openai.com/v1").build();
    }

    public Mono<String> analyzeCode(String code) {
        // Create proper JSON structure
        Map<String, Object> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", "Analyze the following code for bugs, errors, and optimizations, format when you get the answer: " + code);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-3.5-turbo");
        requestBody.put("messages", new Map[]{message});
        requestBody.put("max_tokens", 500);
        requestBody.put("temperature", 0.7);

        try {
            String jsonBody = objectMapper.writeValueAsString(requestBody);
            
            return webClient.post()
                    .uri("/chat/completions")
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(jsonBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .doOnError(error -> System.out.println("Error: " + error.getMessage()));
                    
        } catch (Exception e) {
            return Mono.just("Error creating request: " + e.getMessage());
        }
    }
}