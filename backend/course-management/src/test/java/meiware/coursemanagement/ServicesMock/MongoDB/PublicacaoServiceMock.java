package meiware.coursemanagement.ServicesMock.MongoDB;

import meiware.coursemanagement.Entities.MongoDB.Publicacao;
import meiware.coursemanagement.Repositories.MongoDB.IPublicacaoRepository;
import meiware.coursemanagement.Services.MongoDB.PublicacaoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class PublicacaoServiceMock {

    @Mock
    private IPublicacaoRepository publicacaoRepository;

    @InjectMocks
    private PublicacaoService publicacaoService;


    List<Publicacao> publicacoes = new ArrayList<>();

    @BeforeEach
    public void setup(){
        for(int i = 0; i < 3 ; i++){
            publicacoes.add(new Publicacao("Titulo" + i, "Descricao" + i, new HashSet<>(Arrays.asList("a" + i, "b" + i)), "TituloForamacao" + i, "João"));
            publicacoes.get(i).setId(String.valueOf(i));
        }
    }

    @DisplayName("Junit test 20 - Teste unitário do método getPublicacoes de PublicacaoService.")
    @Test
    public void getPublicacoes() {
        // given - precondition or setup
        given(publicacaoRepository.findAllByOrderByDataCriacaoDesc()).willReturn(publicacoes);

        // when - action or behavior that we are going to test
        List<Publicacao> publicacoes1 = publicacaoService.getPublicacoes();

        // then
        assertNotNull(publicacoes1);
        assertEquals(this.publicacoes, publicacoes1);
    }


    @DisplayName("Junit test 21 - Teste unitário do método arquivarPublicacao de PublicacaoService.")
    @Test
    public void arquivarPublicacao() {
        // given - precondition or setup
        Publicacao auxPublicacao = new Publicacao("Titulo", "Descricao", new HashSet<>(Arrays.asList("a", "b")), "TituloForamacao", "João");
        given(publicacaoRepository.findById(auxPublicacao.getId())).willReturn(Optional.of(auxPublicacao));

        // when - action or behavior that we are going to test
        assertFalse(auxPublicacao.isArquivada());
        publicacaoService.arquivarPublicacao(auxPublicacao);

        // then;
        assertNotNull(auxPublicacao);
        assertTrue(auxPublicacao.isArquivada());
    }

    @DisplayName("Junit test 45 - Teste unitário do método getPublicacaoById de PublicacaoService.")
    @Test
    public void getPublicacaoById() {
        // given - precondition or setup
        Publicacao auxPub = publicacoes.get(1);
        given(publicacaoRepository.findById(auxPub.getId())).willReturn(Optional.of(auxPub));

        // when - action or behavior that we are going to test
        Publicacao publicacao = publicacaoService.getPublicacaoById(auxPub.getId());

        // then
        assertNotNull(publicacao);
        assertEquals(publicacao, auxPub);
    }

    @DisplayName("Junit test 46 - Teste unitário do método createPublicacao de PublicacaoService.")
    @Test
    public void createPublicacao() {
        // given - precondition or setup
        Publicacao auxPub = publicacoes.get(1);
        given(publicacaoRepository.insert(auxPub)).willReturn(auxPub);

        // when - action or behavior that we are going to test
        String publicacaoId = publicacaoService.createPublicacao(auxPub, null);

        // then
        assertNotNull(publicacaoId);
        assertEquals(publicacaoId, auxPub.getId());
    }

    @DisplayName("Junit test 48 - Teste unitário do método removePublicacao de PublicacaoService.")
    @Test
    public void removePublicacao() {
        // given - precondition or setup
        Publicacao auxPub = publicacoes.get(1);

        // when - action or behavior that we are going to test
        publicacaoService.removePublicacao(auxPub);

        // then
        verify(publicacaoRepository, times(1)).delete(auxPub);
    }

}

