package meiware.coursemanagement.Services.JPA;

import meiware.coursemanagement.Entities.JPA.Utilizador;

import java.util.List;

public interface IUtilizadorService {
    List<Utilizador> getUtilizadores();
    List<Utilizador> getColaboradores();
    List<Utilizador> getGestores();
    List<Utilizador> getAdministradores();
    List<Utilizador> getManagedUtilizadores(Utilizador manager);
    Utilizador getUtilizadorById(Long id);
    Utilizador getUtilizadorByEmail(String email);
    Utilizador createUtilizador(Utilizador newUtilizador);
    void updateUtilizador(Utilizador updatedUtilizador);
    void removeUtilizador(Utilizador utilizador);
}
