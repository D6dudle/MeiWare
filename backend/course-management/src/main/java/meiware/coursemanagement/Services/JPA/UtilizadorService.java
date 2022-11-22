package meiware.coursemanagement.Services.JPA;

import meiware.coursemanagement.Entities.JPA.Utilizador;
import meiware.coursemanagement.Repositories.JPA.IUtilizadorRepository;
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
        try {

            for (Utilizador u: utilizadorRepository.findAll()) {
                utilizadores.add(u);
            }
        }catch (Exception e) {
            e.printStackTrace();
        }

        return utilizadores;
    }

    @Override
    public List<Utilizador> getColaboradores() {
        List<Utilizador> colaboradores = new ArrayList<>();
        try {
            for (Utilizador u: utilizadorRepository.findAll()) {
                if(u.isColaborador() && !u.isGestor() && !u.isAdministrador()) {
                    colaboradores.add(u);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return colaboradores;
    }

    @Override
    public List<Utilizador> getGestores() {
        List<Utilizador> gestores = new ArrayList<>();

        try {
            for (Utilizador u: utilizadorRepository.findAll()) {
                if(u.isGestor() && !u.isAdministrador()) {
                    gestores.add(u);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }


        return gestores;
    }

    @Override
    public List<Utilizador> getAdministradores() {
        List<Utilizador> administradores = new ArrayList<>();

        try {
            for (Utilizador u: utilizadorRepository.findAll()) {
                if(u.isAdministrador()) {
                    administradores.add(u);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return administradores;
    }

    @Override
    public List<Utilizador> getManagedUtilizadores(Utilizador manager) {
        List<Utilizador> utilizadores = new ArrayList<>();

        try {
            if(utilizadorRepository.findById(manager.getId()).isPresent()) {
                utilizadores = utilizadorRepository.findAllByManager(manager);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return utilizadores;
    }

    @Override
    public Utilizador getUtilizadorById(Long id) {
        Utilizador utilizador = null;

        try {
            utilizador = utilizadorRepository.findById(id).orElse(null);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return utilizador;
    }

    @Override
    public Utilizador getUtilizadorByEmail(String email) {
        Utilizador utilizador = null;

        try {
            utilizador = utilizadorRepository.findByEmail(email);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return utilizador;
    }

    @Override
    public Utilizador createUtilizador(Utilizador newUtilizador) {
        try {
            utilizadorRepository.save(newUtilizador);
            return newUtilizador;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public void updateUtilizador(Utilizador updatedUtilizador) {
        try {
            utilizadorRepository.save(updatedUtilizador);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void removeUtilizador(Utilizador utilizador) {
        try {
            utilizadorRepository.delete(utilizador);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
