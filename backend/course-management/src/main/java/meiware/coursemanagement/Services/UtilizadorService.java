package meiware.coursemanagement.Services;

import meiware.coursemanagement.JPA.Utilizador;
import meiware.coursemanagement.Repositories.IUtilizadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UtilizadorService implements IUtilizadorService {
    @Autowired
    private IUtilizadorRepository utilizadorRepository;
    // TODO: exception handling

    @Override
    public List<Utilizador> getUtilizadores() {
        List<Utilizador> utilizadores = new ArrayList<>();
        for (Utilizador u: utilizadorRepository.findAll()) {
            utilizadores.add(u);
        }

        return utilizadores;
    }

    @Override
    public List<Utilizador> getColaboradores() {
        List<Utilizador> colaboradores = new ArrayList<>();
        for (Utilizador u: utilizadorRepository.findAll()) {
            if(u.isColaborador() && !u.isGestor() && !u.isAdministrador()) {
                colaboradores.add(u);
            }
        }

        return colaboradores;
    }

    @Override
    public List<Utilizador> getGestores() {
        List<Utilizador> gestores = new ArrayList<>();
        for (Utilizador u: utilizadorRepository.findAll()) {
            if(u.isGestor() && !u.isAdministrador()) {
                gestores.add(u);
            }
        }

        return gestores;
    }

    @Override
    public List<Utilizador> getAdministradores() {
        List<Utilizador> administradores = new ArrayList<>();
        for (Utilizador u: utilizadorRepository.findAll()) {
            if(u.isAdministrador()) {
                administradores.add(u);
            }
        }

        return administradores;
    }

    @Override
    public List<Utilizador> getManagedUtilizadores(Utilizador manager) {
        // TODO: verificar que o manager existe
        return utilizadorRepository.findAllByManager(manager);
    }

    @Override
    public Utilizador getUtilizadorById(Long id) {
        return utilizadorRepository.findById(id).orElse(null);
    }

    @Override
    public Utilizador getUtilizadorByEmail(String email) {
        return utilizadorRepository.findByEmail(email);
    }

    @Override
    public Utilizador createUtilizador(Utilizador newUtilizador) {
        utilizadorRepository.save(newUtilizador);
        return newUtilizador;
    }

    @Override
    public void updateUtilizador(Utilizador updatedUtilizador) {
        utilizadorRepository.save(updatedUtilizador);
    }

    @Override
    public void removeUtilizador(Utilizador utilizador) {
        utilizadorRepository.delete(utilizador);
    }
}
