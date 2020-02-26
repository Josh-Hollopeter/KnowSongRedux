package com.skilldistillery.knowsong.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.knowsong.services.PlaylistService;

@RestController
@RequestMapping(path = "api")
@CrossOrigin({ "*", "http://localhost:4250" })
public class PlaylistController {

		@Autowired
		private PlaylistService pSvc;
		
		
}
