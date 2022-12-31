package meiware.coursemanagement.Images;

import meiware.coursemanagement.Entities.JPA.PedidoFormacao;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

public class PedidoFormacaoImage {
    private PedidoFormacao pedidoFormacao;
    private List<File> files;

    public PedidoFormacaoImage() {
    }

    public PedidoFormacaoImage(PedidoFormacao pedidoFormacao, List<File> files) {
        this.pedidoFormacao = pedidoFormacao;
        this.files = files;
    }

    public PedidoFormacao getPedidoFormacao() {
        return pedidoFormacao;
    }

    public void setPedidoFormacao(PedidoFormacao pedidoFormacao) {
        this.pedidoFormacao = pedidoFormacao;
    }

    public List<File> getFiles() {
        return files;
    }

    public void setFiles(List<File> files) {
        this.files = files;
    }

    @Override
    public String toString() {
        return "PedidoFormacaoImage{" +
                "pedidoFormacao=" + pedidoFormacao +
                ", files=" + files +
                '}';
    }
}
