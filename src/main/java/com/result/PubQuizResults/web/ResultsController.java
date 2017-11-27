package com.result.PubQuizResults.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ResultsController {
 
    @RequestMapping(value = {"/", "/login"})
    public String login() {
        return "login";
    }
    
    @RequestMapping(value = "/index")
    public String indexSecure() {
        return "index";
    }



}