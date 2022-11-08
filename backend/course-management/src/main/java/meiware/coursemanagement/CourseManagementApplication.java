package meiware.coursemanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "meiware.coursemanagement")
@EnableJpaRepositories("meiware.coursemanagement.Repositories")
public class CourseManagementApplication {
	public static void main(String[] args) {
		SpringApplication.run(CourseManagementApplication.class, args);
	}

}
