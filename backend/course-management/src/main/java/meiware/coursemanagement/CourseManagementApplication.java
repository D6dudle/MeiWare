package meiware.coursemanagement;

import meiware.coursemanagement.Services.teste;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Component;

@SpringBootApplication(scanBasePackages = "meiware.coursemanagement")
@EnableJpaRepositories("meiware.coursemanagement.Repositories")
public class CourseManagementApplication {
	public static void main(String[] args) {
		SpringApplication.run(CourseManagementApplication.class, args);
	}

}
