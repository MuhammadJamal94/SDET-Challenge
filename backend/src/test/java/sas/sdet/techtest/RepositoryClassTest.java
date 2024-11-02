package sas.sdet.techtest;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.junit.jupiter.api.extension.ExtendWith;

import sas.sdet.techtest.domain.Order;
import sas.sdet.techtest.domain.Tournament;
import sas.sdet.techtest.domain.User;
import sas.sdet.techtest.repository.RepositoryClass;
import sas.sdet.techtest.repository.NotEnoughProException;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Sql(statements = { 
    "delete from t_orders", 
    "delete from t_items", 
    "delete from t_users",
    "insert into t_users (user_name, user_prop) values ('Munson', 15)",
    "insert into t_users (user_name, user_prop) values ('McCracken', 100)",
    "insert into t_items (item_name, item_prop, item_type) values ('Murfreesboro Strike and Spare', 20, 'Torneo')",
    "insert into t_items (item_name, item_prop, item_type) values ('Bowlerama Lanes Iowa', 7, 'Torneo')",
    "insert into t_orders (ord_id, ord_user, ord_item) values (1,'Munson','Bowlerama Lanes Iowa')" 
})
public class RepositoryClassTest {

    @Autowired
    private RepositoryClass repositoryClass;

    @PersistenceContext
    private EntityManager em;

    @Test
    public void testLoadUser() {
        User user = repositoryClass.loadUser("Munson");
        assertNotNull(user);
        assertEquals("Munson", user.getName());
    }

    @Test
    public void testLoadItem() {
        Tournament tournament = repositoryClass.loadItem("Bowlerama Lanes Iowa");
        assertNotNull(tournament);
        assertEquals("Bowlerama Lanes Iowa", tournament.getName());
    }

    @Test
    public void testOrder() throws NotEnoughProException {
        Order order = repositoryClass.order("Munson", "Bowlerama Lanes Iowa");
        assertNotNull(order);
        assertEquals("Munson", order.getUser().getName());
        assertEquals("Bowlerama Lanes Iowa", order.getItem().getName());
    }

    @Test
    public void testOrderListByUser() {
        List<Order> orders = repositoryClass.orderListByUser("Munson");
        assertNotNull(orders);
        assertFalse(orders.isEmpty());
    }
}