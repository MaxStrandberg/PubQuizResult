package com.result.PubQuizResults;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.result.PubQuizResults.domain.*;

@SpringBootApplication
public class PubQuizResultsApplication {

	public static void main(String[] args) {
		SpringApplication.run(PubQuizResultsApplication.class, args);
	}
	
	@Bean
	public CommandLineRunner demo(ResultRepository repository) {
		return (args) -> {

   


			repository.save(new Result("Sports Academy", "15.09.2017", 41, 2));
			repository.save(new Result("Vltava", "13.09.2017", 36, 4));
			
		};	
	}
}
