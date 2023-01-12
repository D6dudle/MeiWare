package meiware.coursemanagement.Services.JPA;

import meiware.coursemanagement.Entities.JPA.Role;
import meiware.coursemanagement.Entities.JPA.Utilizador;
import meiware.coursemanagement.Repositories.JPA.IUtilizadorRepository;
import org.json.JSONObject;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.util.*;

@Service
public class UtilizadorService implements IUtilizadorService {
    @Autowired
    private IUtilizadorRepository utilizadorRepository;
    @Autowired
    private ModelMapper mapper;

    @Override
    public List<Utilizador> getUtilizadores() {
        List<Utilizador> utilizadores = new ArrayList<>();
        try {
            for (Utilizador u: utilizadorRepository.findAllByOrderByNomeAsc()) {
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
            for (Utilizador u: utilizadorRepository.findAllByOrderByNomeAsc()) {
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
            for (Utilizador u: utilizadorRepository.findAllByOrderByNomeAsc()) {
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
            for (Utilizador u: utilizadorRepository.findAllByOrderByNomeAsc()) {
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
    public void updateUtilizador(JSONObject object, Utilizador utilizador) {
        try {
            Set<Role> roles = new HashSet<>();
            if(object.has("nome")){
                utilizador.setNome(object.getString("nome"));
            }
            if(object.has("email")){
                utilizador.setEmail(object.getString("email"));
            }
            if(object.has("role")){
                System.out.println(object.getString("role"));
                if(object.getString("role").equals("administrador")){
                    roles.add(Role.COLABORADOR);
                    roles.add(Role.GESTOR);
                    roles.add(Role.ADMINISTRADOR);

                }
                else if(object.getString("role").equals("gestor")){
                    roles.add(Role.COLABORADOR);
                    roles.add(Role.GESTOR);

                }
                else {
                    roles.add(Role.COLABORADOR);
                }
                utilizador.setRoles(roles);
            }
            if(object.has("managerId")) {
                utilizador.setManager(getUtilizadorById(object.getLong("managerId")));
            }
            utilizadorRepository.save(utilizador);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void removeUtilizador(Long id) {
        try {
            Utilizador u = getUtilizadorById(id);
            u.setApagado(true);
            utilizadorRepository.save(u);

            //utilizadorRepository.deleteUtilizadorById(id);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
