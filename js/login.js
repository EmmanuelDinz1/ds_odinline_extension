$("#formulario").validate(
    {
        rules: {
            login: {
                required: true,
                minlength: 3,
            },
            senha: {
                required: true,
                minlength: 3,
            }
        },
        messages: {
            login: {
                required: "Campo obrigatório",
                minlength: "Mínimo 3 caracteres"
            },
            senha: {
                required: "Campo obrigatório",
                minlength: "Mínimo 3 caracteres"
            }
        }
    }
);

async function autenticar() {
    debugger
    if ($("#formulario").validate().form()) {
        const login = $("#login").val();
        const senha = $("#senha").val();
        const url = `https://api-odinline.odiloncorrea.com/usuario/${login}/${senha}/autenticar`;
        const data = { login, senha };
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
        try {
            const response = await fetch(url);
            if (response.ok) {
                const jsonResponse = await response.json();
                localStorage.setItem("token", jsonResponse.token);
                window.location.href = "menu.html";
            } else {
                alert("Login ou senha inválidos!");
            }
        } catch (error) {
            console.error("Erro:", error);
        }
    } 
}

async function produto() {
    if("#") {
        const url = `https://api-odinline.odiloncorrea.com/produto`;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
            const response = await fetch(url, options);
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log(jsonResponse);
            } else {
                alert("Erro ao buscar produtos!");
            }
        } catch (error) {
            console.error("Erro:", error);
        }
    }
}