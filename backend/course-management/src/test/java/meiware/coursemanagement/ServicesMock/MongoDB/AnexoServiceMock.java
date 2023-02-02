package meiware.coursemanagement.ServicesMock.MongoDB;

import meiware.coursemanagement.Entities.JPA.AnexoRef;
import meiware.coursemanagement.Entities.MongoDB.Anexo;
import meiware.coursemanagement.Repositories.MongoDB.IAnexoRepository;
import meiware.coursemanagement.Services.MongoDB.AnexoService;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AnexoServiceMock{

    @Mock
    private IAnexoRepository anexoRepository;

    @InjectMocks
    private AnexoService anexoService;

    @Captor
    ArgumentCaptor<Anexo> anexoCaptor;


    List<Anexo> anexos = new ArrayList<>();
    List<AnexoRef> anexosRef = new ArrayList<>();

    @BeforeEach
    public void setup(){
        for(int i = 0; i < 3 ; i++){
            //anexos.add(new Anexo(String.valueOf(i), "Anexo " + i));
            anexos.add(new Anexo("Anexo" + i, "image", "10MB"));
            anexosRef.add(new AnexoRef("Path" + i, "Nome" + i, "Type" + i, "Size" + i));
        }
    }

    @DisplayName("Junit test 18 - Teste unitário do método getAnexos de AnexoService.")
    @Test
    public void getAnexos() {
        // given - precondition or setup
        given(anexoRepository.findAll()).willReturn(anexos);

        // when - action or behavior that we are going to test
        List<Anexo> anexos = anexoService.getAnexos();

        // then
        assertNotNull(anexos);
        assertEquals(this.anexos, anexos);
    }

    @DisplayName("Junit test 19 - Teste unitário do método createAnexo de AnexoService.")
    @Test
    public void createAnexo() throws IOException {
        // given - precondition or setup
        MockMultipartFile file = new MockMultipartFile("teste", new byte[0]);
        Anexo anexo = new Anexo( file.getOriginalFilename(), "image", "10MB");
        anexo.setConteudo(new Binary(BsonBinarySubType.BINARY, file.getBytes()));

        // when - action or behavior that we are going to test
        anexoService.createAnexo(file);

        // then
        verify(anexoRepository).save(anexoCaptor.capture());
        Anexo newAnexo = anexoCaptor.getValue();

        assertNotNull(newAnexo);
        assertThat(anexo.getNome().equals(newAnexo.getNome()) && anexo.getConteudo().equals(newAnexo.getConteudo()));
    }

    @DisplayName("Junit test 41 - Teste unitário do método getPedidoFormacaoAnexos de AnexoService.")
    @Test
    public void getPedidoFormacaoAnexos() {
        // given - precondition or setup
        List<String> paths = new ArrayList<>();
        for(AnexoRef i : anexosRef)
            paths.add(i.getPath());
        given(anexoRepository.findAllById(paths)).willReturn(anexos);

        // when - action or behavior that we are going to test
        List<Anexo> anexosList = anexoService.getPedidoFormacaoAnexos(anexosRef);

        // then
        assertNotNull(anexosList);
        assertEquals(anexosList, anexos);
    }

    @DisplayName("Junit test 42 - Teste unitário do método getAnexoById de AnexoService.")
    @Test
    public void getAnexoById() {
        // given - precondition or setup
        given(anexoRepository.findById("0")).willReturn(Optional.ofNullable(anexos.get(0)));

        // when - action or behavior that we are going to test
        Anexo anexo = anexoService.getAnexoById("0");
        Anexo anexoNull = anexoService.getAnexoById("");

        // then
        assertNotNull(anexo);
        assertEquals(anexos.get(0), anexo);
        assertNull(anexoNull);
    }

    @DisplayName("Junit test 44 - Teste unitário do método removeAnexo de AnexoService.")
    @Test
    public void removeAnexo() {
        // given - precondition or setup

        // when - action or behavior that we are going to test
        anexoService.removeAnexo(anexos.get(0).getId());

        // then
        verify(anexoRepository, times(1)).deleteById(anexos.get(0).getId());
    }
}

