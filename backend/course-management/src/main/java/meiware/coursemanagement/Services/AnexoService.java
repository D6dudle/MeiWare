package meiware.coursemanagement.Services;

import meiware.coursemanagement.Entities.JPA.Anexo;
import meiware.coursemanagement.Repositories.IAnexoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AnexoService implements IAnexoService{

    @Autowired
    private IAnexoRepository anexoRepository;

    @Override
    public List<Anexo> getAnexos() {
        List<Anexo> anexos = new ArrayList<>();

        try {
            for (Anexo a: anexoRepository.findAll()) {
                anexos.add(a);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return anexos;
    }

    @Override
    public Anexo getAnexoById(Long id) {
        Anexo anexo = null;

        try {
            return anexoRepository.findById(id).orElse(null);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public Anexo createAnexo(Anexo newAnexo) {
        try {
            return anexoRepository.save(newAnexo);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void updateAnexo(Anexo updatedAnexo) {
        try {
            anexoRepository.save(updatedAnexo);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void removeAnexo(Anexo anexo) {
        try {
            anexoRepository.delete(anexo);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
