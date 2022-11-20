package meiware.coursemanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication(scanBasePackages = "meiware.coursemanagement")
@EnableJpaRepositories("meiware.coursemanagement.Repositories")
@EnableMongoRepositories(basePackages = "meiware.coursemanagement.Repositories")
public class CourseManagementApplication {
	public static void main(String[] args) {
		SpringApplication.run(CourseManagementApplication.class, args);
		//testJPA();
	}

	static void testJPA(){
		JPAtest jpAtest = new JPAtest();
		jpAtest.demo();
	}

}
