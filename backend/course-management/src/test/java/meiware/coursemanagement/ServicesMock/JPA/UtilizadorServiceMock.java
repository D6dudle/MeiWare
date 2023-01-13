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
import java.util.stream.Collectors;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
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

    @DisplayName("Junit test 17 - Teste unitário do método createUtilizador de UtilizadorService")
    @Test
    public void createUtilizador() {
        // given - precondition or setup
        Set<Role> auxUserRoles = new HashSet<>();
        auxUserRoles.add(Role.GESTOR);
        auxUserRoles.add(Role.ADMINISTRADOR);
        auxUserRoles.add(Role.COLABORADOR);
        Utilizador auxUser = new Utilizador("Ptiago", "ptiago@email.com", "123456", auxUserRoles);
        given(utilizadorRepository.save(auxUser)).willReturn(auxUser);

        // when - action or behavior that we are going to test
        Utilizador user = utilizadorService.createUtilizador(auxUser);

        // then
        assertNotNull(user);
        assertEquals(user, auxUser);
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

    @DisplayName("Junit test 36 - Teste unitário do método getManagedUtilizadores de UtilizadorService.")
    @Test
    public void getManagedUtilizadores() {
        // given - precondition or setup
        Set<Role> auxUserRoles = new HashSet<>();
        auxUserRoles.add(Role.GESTOR);
        auxUserRoles.add(Role.ADMINISTRADOR);
        auxUserRoles.add(Role.COLABORADOR);
        Utilizador manager = new Utilizador("Ptiago", "ptiago@email.com", "123456", auxUserRoles);

        List<Utilizador> usersCopy = new ArrayList<>(users);

        for(Utilizador i: usersCopy)
            i.setManager(manager);

        given(utilizadorRepository.findAllByManager(manager)).willReturn(usersCopy);
        given(utilizadorRepository.findById(manager.getId())).willReturn(Optional.of(manager));

        // when - action or behavior that we are going to test
        List<Utilizador> users = utilizadorService.getManagedUtilizadores(manager);
        // then
        assertNotNull(users);

        for (Utilizador u: users) {
            assertEquals(u.getManager(), manager);
        }
    }

    @DisplayName("Junit test 37 - Teste unitário do método getUtilizadorById de UtilizadorService.")
    @Test
    public void getUtilizadorById() {
        // given - precondition or setup
        Set<Role> auxUserRoles = new HashSet<>();
        auxUserRoles.add(Role.GESTOR);
        auxUserRoles.add(Role.ADMINISTRADOR);
        auxUserRoles.add(Role.COLABORADOR);
        Utilizador auxUser = new Utilizador("Ptiago", "ptiago@email.com", "123456", auxUserRoles);

        given(utilizadorRepository.findById(auxUser.getId())).willReturn(Optional.of(auxUser));

        // when - action or behavior that we are going to test
        Utilizador user = utilizadorService.getUtilizadorById(auxUser.getId());

        // then
        assertNotNull(user);
        assertEquals(auxUser, user);
    }

    @DisplayName("Junit test 38 - Teste unitário do método getUtilizadorByEmail de UtilizadorService.")
    @Test
    public void getUtilizadorByEmail() {
        // given - precondition or setup
        Set<Role> auxUserRoles = new HashSet<>();
        auxUserRoles.add(Role.GESTOR);
        auxUserRoles.add(Role.ADMINISTRADOR);
        auxUserRoles.add(Role.COLABORADOR);
        Utilizador auxUser = new Utilizador("Ptiago", "ptiago@email.com", "123456", auxUserRoles);

        given(utilizadorRepository.findByEmail(auxUser.getEmail())).willReturn(auxUser);

        // when - action or behavior that we are going to test
        Utilizador user = utilizadorService.getUtilizadorByEmail(auxUser.getEmail());

        // then
        assertNotNull(user);
        assertEquals(auxUser, user);
    }

    @DisplayName("Junit test 39 - Teste unitário do método updateUtilizador de UtilizadorService.")
    @Test
    public void updateUtilizador() {
        // given - precondition or setup
        /* Set<Role> auxUserRoles = new HashSet<>();
        auxUserRoles.add(Role.GESTOR);
        auxUserRoles.add(Role.ADMINISTRADOR);
        auxUserRoles.add(Role.COLABORADOR);
        Utilizador auxUser = new Utilizador("Ptiago", "ptiago@email.com", "123456", auxUserRoles);

        given(utilizadorRepository.findByEmail(auxUser.getEmail())).willReturn(auxUser);
        given(utilizadorRepository.save(auxUser)).willReturn(auxUser);

        // when - action or behavior that we are going to test
        auxUser.setNome("PtiagoNEW");
        Utilizador updatedUser = utilizadorService.getUtilizadorByEmail(auxUser.getEmail());

        // then
        assertNotNull(updatedUser);
        assertThat(updatedUser.getEmail().equals("PtiagoNEW"));*/
    }

    @DisplayName("Junit test 40 - Teste unitário do método removeUtilizador de UtilizadorService.")
    @Test
    public void removeUtilizador() {
        // given - precondition or setup
        Set<Role> auxUserRoles = new HashSet<>();
        auxUserRoles.add(Role.GESTOR);
        auxUserRoles.add(Role.ADMINISTRADOR);
        auxUserRoles.add(Role.COLABORADOR);
        Utilizador auxUser = new Utilizador("Ptiago", "ptiago@email.com", "123456", auxUserRoles);

        given(utilizadorRepository.findById(auxUser.getId())).willReturn(Optional.of(auxUser));
        given(utilizadorRepository.findByEmail(auxUser.getEmail())).willReturn(null);

        // when - action or behavior that we are going to test
        utilizadorService.removeUtilizador(auxUser.getId());
        Utilizador user = utilizadorService.getUtilizadorByEmail(auxUser.getEmail());

        // then
        assertNull(user);
    }

}
