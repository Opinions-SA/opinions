package com.opinions;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@ServletComponentScan("com.opinions")
@EnableFeignClients
public class OpinionsApplication {

	public static void main(String[] args) {
		SpringApplication.run(OpinionsApplication.class, args);
	}

}
