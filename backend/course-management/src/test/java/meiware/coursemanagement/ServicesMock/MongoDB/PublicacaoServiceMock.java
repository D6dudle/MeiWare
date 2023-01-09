package meiware.coursemanagement.ServicesMock.MongoDB;

import meiware.coursemanagement.Entities.MongoDB.Anexo;
import meiware.coursemanagement.Entities.MongoDB.Publicacao;
import meiware.coursemanagement.Repositories.MongoDB.IAnexoRepository;
import meiware.coursemanagement.Repositories.MongoDB.IPublicacaoRepository;
import meiware.coursemanagement.Services.MongoDB.AnexoService;
import meiware.coursemanagement.Services.MongoDB.PublicacaoService;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
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
            publicacoes.add(new Publicacao("Titulo" + i, "Descricao" + i, new HashSet<>(Arrays.asList("a" + i, "b" + i)), "TituloForamacao" + i));
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
        Publicacao auxPublicacao = new Publicacao("Titulo", "Descricao", new HashSet<>(Arrays.asList("a", "b")), "TituloForamacao");
        given(publicacaoRepository.findById(auxPublicacao.getId())).willReturn(Optional.of(auxPublicacao));

        // when - action or behavior that we are going to test
        assertFalse(auxPublicacao.isArquivada());
        publicacaoService.arquivarPublicacao(auxPublicacao);

        // then;
        assertNotNull(auxPublicacao);
        assertTrue(auxPublicacao.isArquivada());
    }

}

