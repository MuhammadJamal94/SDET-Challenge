package sas.sdet.techtest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Sql(statements = { 
    "delete from t_orders", 
    "delete from t_items", 
    "delete from t_users",
    "insert into t_users (user_name, user_prop) values ('Munson', 15)",
    "insert into t_users (user_name, user_prop) values ('McCracken', 100)",
    "insert into t_items (item_name, item_prop, item_type) values ('Murfreesboro Strike and Spare', 20, 'Torneo')",
    "insert into t_items (item_name, item_prop, item_type) values ('Bowlerama Lanes Iowa', 77, 'Torneo')",
    "insert into t_orders (ord_id, ord_user, ord_item) values (1,'Munson','Bowlerama Lanes Iowa')" 
})

public class ControllerClassTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testHome() throws Exception {
        mockMvc.perform(get("/"))
                .andExpect(status().isOk())
                .andExpect(content().string("Welcome to the Home Page!"));
    }

    @Test
    public void testGetUser() throws Exception {
        mockMvc.perform(get("/user/Munson"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(content().json("{'name':'Munson','dexterity':15}"));
    }

    @Test
    public void testAddUserToLeague() throws Exception {
        mockMvc.perform(post("/order")
            .param("user", "McCracken")
            .param("item", "Bowlerama Lanes Iowa"))
            .andExpect(status().isOk())
            .andExpect(content().contentType("text/plain;charset=UTF-8"))
            .andExpect(content().string("OK"));
    }

    @Test
    public void testAddUserWithNotEnoughDexterity() throws Exception {
        mockMvc.perform(post("/order")
            .param("user", "Munson")
            .param("item", "Murfreesboro Strike and Spare"))
            .andExpect(status().isOk())
            .andExpect(content().contentType("text/plain;charset=UTF-8"))
            .andExpect(content().string("KO"));
    }

    @Test
    public void testUserNotFound() throws Exception {
        mockMvc.perform(get("/users/unknown"))
            .andExpect(status().isNotFound());
    }

    @Test
    public void testTournamentNotFound() throws Exception {
        mockMvc.perform(get("/tournaments/unknown"))
            .andExpect(status().isNotFound());
    }

    @Test
    public void testOrderNotFound() throws Exception {
        mockMvc.perform(get("/orders/999"))
            .andExpect(status().isNotFound());
    }
}