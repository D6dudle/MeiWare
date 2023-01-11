package meiware.coursemanagement;

import jdk.jshell.execution.Util;
import meiware.coursemanagement.Entities.JPA.*;
import meiware.coursemanagement.Entities.MongoDB.Anexo;
import meiware.coursemanagement.Entities.MongoDB.Publicacao;
import meiware.coursemanagement.Repositories.JPA.IAnexoRefRepository;
import meiware.coursemanagement.Repositories.JPA.IUtilizadorRepository;
import meiware.coursemanagement.Repositories.MongoDB.IAnexoRepository;
import meiware.coursemanagement.Services.JPA.IPedidoFormacaoService;
import meiware.coursemanagement.Services.JPA.IUtilizadorService;
import meiware.coursemanagement.Services.MongoDB.IAnexoService;
import meiware.coursemanagement.Services.MongoDB.IPublicacaoService;
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
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.EventListener;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.*;

//@SpringBootApplication
@EnableMongoAuditing
@Component
public class JPAtest {
    private static final Logger log = LoggerFactory.getLogger(JPAtest.class);
    @Autowired
    private IUtilizadorRepository iUtilizadorRepository;

    @Autowired
    private IAnexoService anexoService;

    @Autowired
    private IPublicacaoService publicacaoService;

    @Autowired
    private IPedidoFormacaoService pedidoFormacaoService;

    @Autowired
    private IAnexoRepository anexoRepository;

    @Autowired
    private IUtilizadorService utilizadorService;

    @Autowired
    private IAnexoRefRepository anexoRefRepository;

    @EventListener
    public void onApplicationEvent(ApplicationReadyEvent event) throws Exception {
        log.info("All Beans have been initizalized. Application is ready to service requests");
        this.run();
    }


    public void run(String... args) throws Exception {

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
            //log.info(nelso.toString());
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
        /*Utilizador utilizador1 = utilizadorService.getUtilizadorById(Long.valueOf(1));
        Utilizador utilizador2 = utilizadorService.getUtilizadorById(Long.valueOf(2));

        PedidoFormacao pedidoFormacao1 = new PedidoFormacao("pedido 1", "descricao 1", "formador", LocalDate.of(2022, 12, 15), Float.valueOf(1), utilizador1);
        PedidoFormacao pedidoFormacao2 = new PedidoFormacao("pedido 2", "descricao 2", "formador", LocalDate.of(2022, 12, 16), Float.valueOf(2), utilizador2);
        PedidoFormacao pedidoFormacao3 = new PedidoFormacao("pedido 3", "descricao 3", "formador", LocalDate.of(2022, 12, 17), Float.valueOf(3), utilizador2);

        pedidoFormacao2.setDataCriacao(LocalDate.of(2022, 12, 10));
        pedidoFormacao3.setDataCriacao(LocalDate.of(2022, 12, 11));


        pedidoFormacaoService.createPedidoFormacao(pedidoFormacao1, new ArrayList<>());
        pedidoFormacaoService.createPedidoFormacao(pedidoFormacao2, new ArrayList<>());
        pedidoFormacaoService.createPedidoFormacao(pedidoFormacao3, new ArrayList<>());*/


        // for (Customer bauer : repository.findByLastName("Bauer")) {
        //  log.info(bauer.toString());
        // }

        /*File file = new File("C:\\Users\\Diogo Filipe\\Desktop\\10 - Mobile Railway.pdf");
        FileItem fileItem = new DiskFileItem("file", Files.probeContentType(file.toPath()), false, file.getName(), (int) file.length(), file.getParentFile());

        File file2 = new File("C:\\Users\\Diogo Filipe\\Desktop\\T87.pdf");
        FileItem fileItem2 = new DiskFileItem("file2", Files.probeContentType(file2.toPath()), false, file2.getName(), (int) file2.length(), file2.getParentFile());


        try {
            InputStream input = new FileInputStream(file);
            OutputStream os = fileItem.getOutputStream();
            IOUtils.copy(input, os);

            InputStream input2 = new FileInputStream(file2);
            OutputStream os2 = fileItem2.getOutputStream();
            IOUtils.copy(input2, os2);
            // Or faster..
            // IOUtils.copy(new FileInputStream(file), fileItem.getOutputStream());
        } catch (IOException ex) {
            // do something.
        }

        MultipartFile multipartFile = new CommonsMultipartFile(fileItem);
        MultipartFile multipartFile2 = new CommonsMultipartFile(fileItem2);

        List<MultipartFile> files = new ArrayList<>();
        files.add(multipartFile);
        files.add(multipartFile2);

        PedidoFormacao pedidoFormacao = new PedidoFormacao("Pedido de Formacao", "Isto e um pedido de formacao...", "Formador", LocalDate.now(), 100, utilizadorService.getUtilizadorById(5l));
        //pedidoFormacao.setQuemFezPedido(iUtilizadorRepository.findById(Long.valueOf(1)).get());
        //PedidoFormacao newPedidoFormacao = pedidoFormacaoService.getPedidoFormacaoById(pedidoFormacaoService.createPedidoFormacao(pedidoFormacao, files).getId());
        pedidoFormacaoService.createPedidoFormacao(pedidoFormacao, files);*/

        /*File file = new File("C:\\Users\\Diogo Filipe\\Desktop\\test.txt");
        FileItem fileItem = new DiskFileItem("file", Files.probeContentType(file.toPath()), false, file.getName(), (int) file.length(), file.getParentFile());
        InputStream input = new FileInputStream(file);
        OutputStream os = fileItem.getOutputStream();
        IOUtils.copy(input, os);
        MultipartFile multipartFile = new CommonsMultipartFile(fileItem);

        PedidoFormacao pedidoFormacao = pedidoFormacaoService.getPedidoFormacaoById(25l);
        pedidoFormacaoService.addAnexoToPedidoFormacao(pedidoFormacao, multipartFile);
        System.out.println(anexoService.getAnexos().get(0).getNome());
        PedidoFormacao pedidoFormacao = pedidoFormacaoService.getPedidoFormacaoById(25l);
        pedidoFormacaoService.removeAnexoFromPedidoFormacao(pedidoFormacao, new AnexoRef("a", "a"));*/
        //pedidoFormacaoService.removeAnexoFromPedidoFormacao(pedidoFormacaoService.getPedidoFormacaoById(28l), (AnexoRef) pedidoFormacaoService.getPedidoFormacaoById(28l).getListAnexoRefs().toArray()[1]);
        //System.out.println(utilizadorService.getUtilizadorByEmail("jose@email.com"));
        /*System.out.println(iUtilizadorRepository.findById(Long.valueOf(1)).get().getListFormacoes());
        System.out.println(pedidoFormacaoService.getPedidoFormacaoById(newPedidoFormacao.getId()).getListAnexoRefs());

        pedidoFormacaoService.removeAnexoFromPedidoFormacao(newPedidoFormacao, (AnexoRef) newPedidoFormacao.getListAnexoRefs().toArray()[0]);
        System.out.println(iUtilizadorRepository.findById(Long.valueOf(1)).get().getListFormacoes());
        System.out.println(pedidoFormacaoService.getPedidoFormacaoById(newPedidoFormacao.getId()).getListAnexoRefs());
        anexoRepository.deleteAll();*/

        //pedidoFormacaoService.rejeitarPedidoFormacao(43l, 4l);
        //pedidoFormacaoService.rejeitarPedidoFormacao(44l);
        //System.out.println(pedidoFormacaoService.getPedidoFormacaoById(43l) instanceof PedidoRejeitado);
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
        File file = new File("backend/course-management/src/main/resources/files/2022_CM_Theoretical_Work.zip");
        FileItem fileItem = new DiskFileItem("file", Files.probeContentType(file.toPath()), false, file.getName(), (int) file.length(), file.getParentFile());

        File file2 = new File("backend/course-management/src/main/resources/files/2022_pm_t_L5_v1.1.pdf");
        FileItem fileItem2 = new DiskFileItem("file2", Files.probeContentType(file2.toPath()), false, file2.getName(), (int) file2.length(), file2.getParentFile());


        try {
            InputStream input = new FileInputStream(file);
            OutputStream os = fileItem.getOutputStream();
            IOUtils.copy(input, os);

            InputStream input2 = new FileInputStream(file2);
            OutputStream os2 = fileItem2.getOutputStream();
            IOUtils.copy(input2, os2);
            // Or faster..
            // IOUtils.copy(new FileInputStream(file), fileItem.getOutputStream());
        } catch (IOException ex) {
            // do something.
        }

        MultipartFile multipartFile = new CommonsMultipartFile(fileItem);
        MultipartFile multipartFile2 = new CommonsMultipartFile(fileItem2);

        List<MultipartFile> files = new ArrayList<>();
        files.add(multipartFile);
        //files.add(multipartFile2);

        Publicacao publicacao = new Publicacao("Publicacao Teste 3", "Isto e uma publicacao teste...", new HashSet<>(), "Formacao 1", "Diogo");

        publicacaoService.createPublicacao(publicacao, files);
        //publicacaoService.arquivarPublicacao(pub);
        //publicacaoService.removePublicacao(pub);
        //String id = anexoService.createAnexo(multipartFile);
        //Anexo anexo = anexoService.getAnexoById(id);
        /*File newFile = new File("C:\\Users\\Diogo Filipe\\Documents\\GitHub\\MeiWare\\backend\\course-management\\src\\main\\resources\\files\\" + pub.getAnexos().get(0).getNome());
        File newFile2 = new File("C:\\Users\\Diogo Filipe\\Documents\\GitHub\\MeiWare\\backend\\course-management\\src\\main\\resources\\files\\" + pub.getAnexos().get(1).getNome());

        FileUtils.writeByteArrayToFile(newFile, pub.getAnexos().get(0).getConteudo().getData());
        FileUtils.writeByteArrayToFile(newFile2, pub.getAnexos().get(1).getConteudo().getData());*//*


        log.info("");*/

        /*Publicacao publicacao1 = new Publicacao("Publicacao 1", "Isto e uma publicacao 1...", new HashSet<>(), "Formacao 1");
        Publicacao publicacao2 = new Publicacao("Publicacao 2", "Isto e uma publicacao 2...", new HashSet<>(), "Formacao 2");
        Publicacao publicacao3 = new Publicacao("Publicacao 3", "Isto e uma publicacao 3...", new HashSet<>(), "Formacao 3");

        publicacao2.setDataCriacao(LocalDate.of(2022,12,10));
        publicacao3.setDataCriacao(LocalDate.of(2022,12,11));

        publicacaoService.createPublicacao(publicacao1, new ArrayList<>());
        publicacaoService.createPublicacao(publicacao2, new ArrayList<>());
        publicacaoService.createPublicacao(publicacao3, new ArrayList<>());*/

    }
}
