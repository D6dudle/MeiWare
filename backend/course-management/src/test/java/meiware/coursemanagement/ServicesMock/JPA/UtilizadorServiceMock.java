package meiware.coursemanagement.ServicesMock.JPA;

import meiware.coursemanagement.Entities.JPA.Budget;
import meiware.coursemanagement.Entities.JPA.Role;
import meiware.coursemanagement.Entities.JPA.Utilizador;
import meiware.coursemanagement.Repositories.JPA.IBudgetRepository;
import meiware.coursemanagement.Repositories.JPA.IUtilizadorRepository;
import meiware.coursemanagement.Services.JPA.BudgetService;
import meiware.coursemanagement.Services.JPA.UtilizadorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class UtilizadorServiceMock {

    @Mock
    private IUtilizadorRepository utilizadorRepository;

    @InjectMocks
    private UtilizadorService utilizadorService;

    List<Utilizador> users = new ArrayList<>();

    @BeforeEach
    public void setup(){

        Set<Role> joseRole = new HashSet<>();
        joseRole.add(Role.ADMINISTRADOR);

        Set<Role> joseRolecolaborador = new HashSet<>();
        joseRolecolaborador.add(Role.COLABORADOR);

        Set<Role> joseRoleManager = new HashSet<>();
        joseRoleManager.add(Role.GESTOR);

        Set<Role> joseRole1 = new HashSet<>();
        joseRole.add(Role.ADMINISTRADOR);
        joseRole.add(Role.GESTOR);

        Set<Role> joseRole2 = new HashSet<>();
        joseRole.add(Role.ADMINISTRADOR);
        joseRole.add(Role.COLABORADOR);

        Set<Role> joseRole3 = new HashSet<>();
        joseRolecolaborador.add(Role.COLABORADOR);
        joseRole.add(Role.GESTOR);


        Set<Role> joseRole4 = new HashSet<>();
        joseRoleManager.add(Role.GESTOR);
        joseRole.add(Role.ADMINISTRADOR);
        joseRole.add(Role.COLABORADOR);



        for(int i = 0; i < 7 ; i++){

            switch (i){

                case 1:
                    users.add(new Utilizador("José" + i, "jose@email" + i + ".com", "123456" + i, joseRole));
                    break;
                case 2:
                    users.add(new Utilizador("José" + i, "jose@email" + i + ".com", "123456" + i, joseRolecolaborador));
                    break;
                case 3:
                    users.add(new Utilizador("José" + i, "jose@email" + i + ".com", "123456" + i, joseRoleManager));
                    break;
                case 4:
                    users.add(new Utilizador("José" + i, "jose@email" + i + ".com", "123456" + i, joseRole1));
                    break;
                case 5:
                    users.add(new Utilizador("José" + i, "jose@email" + i + ".com", "123456" + i, joseRole2));
                    break;
                case 6:
                    users.add(new Utilizador("José" + i, "jose@email" + i + ".com", "123456" + i, joseRole3));
                    break;
                case 7:
                    users.add(new Utilizador("José" + i, "jose@email" + i + ".com", "123456" + i, joseRole4));
                    break;
            }

        }
    }

    @DisplayName("Junit test 16 - Teste unitário do método getUtilizadores de UtilzadoresService.")
    @Test
    public void getUtilizadores() {
        // given - precondition or setup
        given(utilizadorRepository.findAllByOrderByNomeAsc()).willReturn(users);

        // when - action or behavior that we are going to test
        List<Utilizador> users = utilizadorService.getUtilizadores();

        // then
        assertNotNull(users);
        assertEquals(this.users, users);
    }

    @DisplayName("Junit test 33 - Teste unitário do método getColaboradores de UtilzadoresService.")
    @Test
    public void getColaboradores() {
        // given - precondition or setup
        given(utilizadorRepository.findAllByOrderByNomeAsc()).willReturn(users);

        // when - action or behavior that we are going to test

        List<Utilizador> users = utilizadorService.getColaboradores();


        // then
        assertNotNull(users);

        for (Utilizador u: users) {

            assertTrue(u.isColaborador());
            assertFalse(u.isAdministrador());
            assertFalse(u.isGestor());

        }
    }

    @DisplayName("Junit test 34 - Teste unitário do método getGestores de UtilzadoresService.")
    @Test
    public void getGestores() {
        // given - precondition or setup
        given(utilizadorRepository.findAllByOrderByNomeAsc()).willReturn(users);

        // when - action or behavior that we are going to test

        List<Utilizador> users = utilizadorService.getGestores();


        // then
        assertNotNull(users);

        for (Utilizador u: users) {

            assertTrue(u.isGestor());
            assertFalse(u.isAdministrador());
            assertFalse(u.isColaborador());

        }
    }

    @DisplayName("Junit test 35 - Teste unitário do método getAdministradores de UtilizadoresService.")
    @Test
    public void getAdministradores() {
        // given - precondition or setup
        given(utilizadorRepository.findAllByOrderByNomeAsc()).willReturn(users);

        // when - action or behavior that we are going to test

        List<Utilizador> users = utilizadorService.getAdministradores();


        // then
        assertNotNull(users);

        for (Utilizador u: users) {

            assertTrue(u.isAdministrador());

        }
    }


}
