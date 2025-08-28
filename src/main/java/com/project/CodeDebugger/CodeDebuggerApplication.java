package com.project.CodeDebugger;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(exclude = {org.springframework.cloud.function.context.config.ContextFunctionCatalogAutoConfiguration.class})
public class CodeDebuggerApplication {

	public static void main(String[] args) {
		SpringApplication.run(CodeDebuggerApplication.class, args);
	}

}
