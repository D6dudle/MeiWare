package meiware.coursemanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication(scanBasePackages = "meiware.coursemanagement")
@EnableJpaRepositories(excludeFilters = @ComponentScan.Filter(type = FilterType.ASPECTJ, pattern = "meiware.coursemanagement.Repositories.MongoDB.*"))
@EnableMongoRepositories(basePackages = "meiware.coursemanagement.Repositories")
public class CourseManagementApplication {
	public static void main(String[] args) {
		SpringApplication.run(CourseManagementApplication.class, args);
		testJPA();
	}

	static void testJPA(){
		JPAtest jpAtest = new JPAtest();
		jpAtest.demo();
	}

}
