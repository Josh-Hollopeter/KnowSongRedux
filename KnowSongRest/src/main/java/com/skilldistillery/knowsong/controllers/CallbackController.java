package com.skilldistillery.knowsong.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CallbackController {

	
@RequestMapping(path = "callback")
public String callback() {
	
	return"#callback";
	
}
	
}
