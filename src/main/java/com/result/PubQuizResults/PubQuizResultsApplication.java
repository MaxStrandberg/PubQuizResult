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

   


			repository.save(new Result("Sports Academy", "2017-11-11", 41, 2));
			repository.save(new Result("Vltava", "2017-11-20", 36, 4));
			
		};	
	}
}
