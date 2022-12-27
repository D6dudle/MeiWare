package meiware.coursemanagement.ServicesMock.JPA;

import meiware.coursemanagement.Entities.JPA.*;
import meiware.coursemanagement.Entities.MongoDB.Anexo;
import meiware.coursemanagement.Repositories.JPA.IAnexoRefRepository;
import meiware.coursemanagement.Repositories.JPA.IBudgetRepository;
import meiware.coursemanagement.Repositories.JPA.IPedidoFormacaoRepository;
import meiware.coursemanagement.Services.JPA.BudgetService;
import meiware.coursemanagement.Services.JPA.PedidoFormacaoService;
import meiware.coursemanagement.Services.MongoDB.AnexoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.mock.web.MockMultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
public class PedidoFormacaoServiceMock {
    @Mock
    private IPedidoFormacaoRepository pedidoFormacaoRepository;

    @Mock
    private ModelMapper modelMapper;

    @Mock
    private AnexoService anexoService;

    @Mock
    private IAnexoRefRepository anexoRefRepository;

    @InjectMocks
    private PedidoFormacaoService pedidoFormacaoService;

    List<PedidoFormacao> pedidosFormacao = new ArrayList<>();
    List<PedidoFormacao> pedidosAprovados = new ArrayList<>();
    List<PedidoFormacao> pedidosRejeitados = new ArrayList<>();

    @BeforeEach
    public void setup(){
        for(int i = 0; i < 3 ; i++){
            PedidoAprovado pedidoAprovado = new PedidoAprovado(i+3, "Pedido aprovado " + i+3, "Descricao " + i+3, "Formador " + i+3, LocalDate.now(), i*300, new Utilizador(),  LocalDate.now());
            PedidoRejeitado pedidoRejeitado = new PedidoRejeitado(i+6,"Pedido rejeitado " + i+6, "Descricao " + i+6, "Formador " + i+6, LocalDate.now(), i*600, new Utilizador(),  LocalDate.now());

            pedidosFormacao.add(new PedidoFormacao(i,"Pedido de formacao " + i, "Descricao " + i, "Formador " + i, LocalDate.now(), i*100, new Utilizador()));
            pedidosFormacao.add(pedidoAprovado);
            pedidosFormacao.add(pedidoRejeitado);

            pedidosAprovados.add(pedidoAprovado);
            pedidosRejeitados.add(pedidoRejeitado);
        }

    }

    @DisplayName("Junit test 14 - Teste unitário do método getPedidosAprovados de PedidoFormacaoService.")
    @Test
    public void getPedidosAprovados() {
        // given - precondition or setup
        given(pedidoFormacaoRepository.findAllByOrderByDataCriacaoDesc()).willReturn(pedidosFormacao);

        // when - action or behavior that we are going to test
        List<PedidoAprovado> pedidosAprovados = pedidoFormacaoService.getPedidosAprovados();

        // then
        assertNotNull(pedidosAprovados);
        assertEquals(this.pedidosAprovados, pedidosAprovados);
    }

    @DisplayName("Junit test 15 - Teste unitário do método getPedidosRejeitados de PedidoFormacaoService.")
    @Test
    public void getPedidosRejeitados() {
        // given - precondition or setup
        given(pedidoFormacaoRepository.findAllByOrderByDataCriacaoDesc()).willReturn(pedidosFormacao);

        // when - action or behavior that we are going to test
        List<PedidoRejeitado> pedidosRejeitados = pedidoFormacaoService.getPedidosRejeitados();

        // then
        assertNotNull(pedidosRejeitados);
        assertEquals(this.pedidosRejeitados, pedidosRejeitados);
    }

    @DisplayName("Junit test 24 - Teste unitário do método getPedidosFormacao de PedidoFormacaoService.")
    @Test
    public void getPedidosFormacao() {
        // given - precondition or setup
        given(pedidoFormacaoRepository.findAllByOrderByDataCriacaoDesc()).willReturn(pedidosFormacao);

        // when - action or behavior that we are going to test
        List<PedidoFormacao> pedidosFormacao = pedidoFormacaoService.getPedidosFormacao();

        // then
        assertNotNull(pedidosFormacao);
        assertEquals(this.pedidosFormacao, pedidosFormacao);
    }

    @DisplayName("Junit test 26 - Teste unitário do método getPedidoFormacaoById de PedidoFormacaoService.")
    @Test
    public void getPedidoFormacaoById() {
        // given - precondition or setup
        given(pedidoFormacaoRepository.findById(0l)).willReturn(Optional.ofNullable(pedidosFormacao.get(0)));

        // when - action or behavior that we are going to test
        PedidoFormacao pedidoFormacao = pedidoFormacaoService.getPedidoFormacaoById(0l);

        // then
        assertNotNull(pedidoFormacao);
        assertEquals(this.pedidosFormacao.get(0), pedidoFormacao);
    }

    @DisplayName("Junit test 27 - Teste unitário do método getPedidoFormacaoByNome de PedidoFormacaoService.")
    @Test
    public void getPedidoFormacaoByNome() {
        // given - precondition or setup
        given(pedidoFormacaoRepository.findByNome("Pedido de formacao 3")).willReturn(pedidosFormacao.get(1));

        // when - action or behavior that we are going to test
        PedidoFormacao pedidoFormacao = pedidoFormacaoService.getPedidoFormacaoByNome("Pedido de formacao 3");

        // then
        assertNotNull(pedidoFormacao);
        assertEquals(this.pedidosFormacao.get(1), pedidoFormacao);
    }

    @DisplayName("Junit test 28 - Teste unitário do método createPedidoFormacao de PedidoFormacaoService.")
    @Test
    public void createPedidoFormacao() {
        // given - precondition or setup
        PedidoFormacao newPedidoFormacao = new PedidoFormacao(20,"Pedido de formacao 20", "Descricao 20", "Formador 20", LocalDate.now(), 2000, new Utilizador());
        given(pedidoFormacaoRepository.save(newPedidoFormacao)).willReturn(newPedidoFormacao);

        // when - action or behavior that we are going to test
        PedidoFormacao pedidoFormacao = pedidoFormacaoService.createPedidoFormacao(newPedidoFormacao, new ArrayList<>());

        // then
        assertNotNull(pedidoFormacao);
        assertEquals(newPedidoFormacao, pedidoFormacao);
    }

    @DisplayName("Junit test 29 - Teste unitário do método updatePedidoFormacao de PedidoFormacaoService.")
    @Test
    public void updatePedidoFormacao() {
        /*// given - precondition or setup
        PedidoFormacao pedidoFormacao = pedidosFormacao.get(0);
        given(pedidoFormacaoRepository.findById(pedidoFormacao.getId())).willReturn(Optional.of(pedidoFormacao));
        given(pedidoFormacaoRepository.save(pedidoFormacao)).willReturn(pedidoFormacao);

        // when - action or behavior that we are going to test
        pedidoFormacao.setNome("Pedido de formacao alterado");
        PedidoFormacao updatedPedidoFormacao = pedidoFormacaoService.updatePedidoFormacao(pedidoFormacao);

        // then
        assertNotNull(pedidoFormacao);
        assertThat(updatedPedidoFormacao.getNome().equals("Pedido de formacao alterado"));*/
    }

    @DisplayName("Junit test 30 - Teste unitário do método addAnexoToPedidoFormacao de PedidoFormacaoService.")
    @Test
    public void addAnexoToPedidoFormacao() {
        /*// given - precondition or setup
        PedidoFormacao pedidoFormacao = pedidosFormacao.get(0);
        MockMultipartFile file = new MockMultipartFile("file", new byte[0]);
        given(pedidoFormacaoRepository.findById(pedidoFormacao.getId())).willReturn(Optional.of(pedidoFormacao));
        given(anexoService.createAnexo(file)).willReturn(new Anexo("file"));
        given(pedidoFormacaoRepository.save(pedidoFormacao)).willReturn(pedidoFormacao);

        // when - action or behavior that we are going to test
        PedidoFormacao updatedPedidoFormacao = pedidoFormacaoService.addAnexoToPedidoFormacao(pedidoFormacao, file);

        // then
        assertNotNull(updatedPedidoFormacao);
        assertThat(updatedPedidoFormacao.getListAnexoRefs().size() == pedidoFormacao.getListAnexoRefs().size());*/
    }

    @DisplayName("Junit test 31 - Teste unitário do método removeAnexoFromPedidoFormacao de PedidoFormacaoService.")
    @Test
    public void removeAnexoFromPedidoFormacao() {
        /*// given - precondition or setup
        PedidoFormacao pedidoFormacao = pedidosFormacao.get(0);
        AnexoRef anexoRef = new AnexoRef();
        pedidoFormacao.getListAnexoRefs().add(anexoRef);
        given(pedidoFormacaoRepository.findById(pedidoFormacao.getId())).willReturn(Optional.of(pedidoFormacao));
        given(pedidoFormacaoRepository.save(pedidoFormacao)).willReturn(pedidoFormacao);

        // when - action or behavior that we are going to test
        PedidoFormacao updatedPedidoFormacao = pedidoFormacaoService.removeAnexoFromPedidoFormacao(pedidoFormacao, anexoRef);

        // then
        assertNotNull(updatedPedidoFormacao);
        assertThat(updatedPedidoFormacao.getListAnexoRefs().size() == pedidoFormacao.getListAnexoRefs().size());*/
    }

    @DisplayName("Junit test 32 - Teste unitário do método removePedidoFormacao de PedidoFormacaoService.")
    @Test
    public void removePedidoFormacao() {
        /*// given - precondition or setup
        PedidoFormacao pedidoFormacao = pedidosFormacao.get(0);
        given(pedidoFormacaoRepository.findById(pedidoFormacao.getId())).willReturn(Optional.of(pedidoFormacao));
        given(pedidoFormacaoRepository.save(pedidoFormacao)).willReturn(pedidoFormacao);

        // when - action or behavior that we are going to test
        PedidoFormacao updatedPedidoFormacao = pedidoFormacaoService.removePedidoFormacao(pedidoFormacao);

        // then
        assertNotNull(updatedPedidoFormacao);
        assertThat(!updatedPedidoFormacao.isApagada());*/
    }
}
