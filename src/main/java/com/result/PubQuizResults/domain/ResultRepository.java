package com.result.PubQuizResults.domain;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.result.PubQuizResults.domain.Result;

public interface ResultRepository extends CrudRepository<Result, Long> {
    List<Result> findByDate(String date);
}