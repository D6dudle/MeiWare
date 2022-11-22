package meiware.coursemanagement;

import meiware.coursemanagement.Entities.MongoDB.Anexo;
import meiware.coursemanagement.Repositories.JPA.IUtilizadorRepository;
import meiware.coursemanagement.Services.MongoDB.IAnexoService;
import meiware.coursemanagement.Services.MongoDB.PublicacaoService;


import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.*;

//@SpringBootApplication
@EnableMongoAuditing
public class JPAtest {
    private static final Logger log = LoggerFactory.getLogger(JPAtest.class);
    @Autowired
    private IUtilizadorRepository iUtilizadorRepository;

    @Autowired
    private IAnexoService anexoService;

    @Bean
    public CommandLineRunner demo() {
        return (args) -> {

            /*// fetch customers by last name
            log.info("----- POSTGRES -----");
            log.info("Customer found with findByEmail('nelso@email.com'):");

            // Sample lists
            Set<Role> nelsoRoleList = new HashSet<>();
            nelsoRoleList.add(Role.GESTOR);
            nelsoRoleList.add(Role.ADMINISTRADOR);

            Set<Role> chadRoleList = new HashSet<>();
            chadRoleList.add(Role.COLABORADOR);

            try{
                Utilizador nelso = iUtilizadorRepository.findByEmail("nelso@email.com");
                Utilizador chad = iUtilizadorRepository.findByEmail("chad@email.com");
                log.info(nelso.toString());
                if(nelso != null)
                    log.info(nelso.toString());
                else
                    iUtilizadorRepository.save(new Utilizador("Nelso", "nelso@email.com", "nelso123", nelsoRoleList));
                if(chad != null)
                    log.info(chad.toString());
                else
                    iUtilizadorRepository.save(new Utilizador("Chad", "chad@email.com", "chad123", chadRoleList, nelso));
            }catch(EmptyResultDataAccessException e){
                // save an admin
                iUtilizadorRepository.save(new Utilizador("Nelso", "nelso@email.com", "nelso123", nelsoRoleList));
            }
            log.info("--------------------------------------------");
            // fetch all customers
            log.info("Customers found with findAll():");
            for (Utilizador user : iUtilizadorRepository.findAll()) {
                log.info(user.toString());
            }
            log.info("--------------------------------------------");

            // fetch an individual customer by ID
            Optional<Utilizador> customer = iUtilizadorRepository.findById(4L);
            log.info("Customer found with findById(4L):");
            log.info(customer.toString());
            log.info("--------------------------------------------");*/



            // for (Customer bauer : repository.findByLastName("Bauer")) {
            //  log.info(bauer.toString());
            // }
            log.info("------- MONGO ------");

            /*try{
                log.info("");
                log.info("Posts found with findBeforeDate():");
                LocalDateTime data = LocalDateTime.now().plusDays(1);
                log.info(data.toString());
                log.info("-------------------------------");

                for (Post post : mongo.findBeforeDate(data)) {
                    log.info(post.toString());
                }
                log.info("");
            }catch(EmptyResultDataAccessException e){
                mongo.save(new Post("Primeiro Post"));
            }

            // fetch all customers
            log.info("Posts found with findAll():");
            log.info("-------------------------------");
            for (Post post : mongo.findAll()) {
                log.info(post.toString());
            }*/
            //MongoDb files
            File file = new File("C:\\Users\\Diogo Filipe\\Desktop\\2022_CM_Theoretical_Work.zip");
            FileItem fileItem = new DiskFileItem("file", Files.probeContentType(file.toPath()), false, file.getName(), (int) file.length(), file.getParentFile());

            try {
                InputStream input = new FileInputStream(file);
                OutputStream os = fileItem.getOutputStream();
                IOUtils.copy(input, os);
                // Or faster..
                // IOUtils.copy(new FileInputStream(file), fileItem.getOutputStream());
            } catch (IOException ex) {
                // do something.
            }

            MultipartFile multipartFile = new CommonsMultipartFile(fileItem);
            String id = anexoService.createAnexo(multipartFile);
            Anexo anexo = anexoService.getAnexoById(id);

            File newFile = new File("C:\\Users\\Diogo Filipe\\Documents\\GitHub\\MeiWare\\backend\\course-management\\src\\main\\resources\\files\\" + anexo.getNome());

            FileUtils.writeByteArrayToFile(newFile, anexo.getConteudo().getData());


            log.info("");
        };
    }

}
