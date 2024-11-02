package sas.sdet.techtest;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.annotation.DirtiesContext;
import javax.transaction.Transactional;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.junit.jupiter.api.extension.ExtendWith;

import sas.sdet.techtest.domain.Order;
import sas.sdet.techtest.service.ServiceClass;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class ServiceClassTest {

    @Autowired
    private ServiceClass serviceClass;

    @Test
    @Transactional
    @Sql(statements = {
        "delete from t_orders",
        "delete from t_items",
        "delete from t_users",
        "insert into t_users (user_name, user_prop) values ('Munson', 15)",
        "insert into t_items (item_name, item_prop, item_type) values ('Bowlerama Lanes Iowa', 77, 'Torneo')",
        "insert into t_orders (ord_id, ord_user, ord_item) values (1, 'Munson', 'Bowlerama Lanes Iowa')"
    })
    public void testOrderListByUserWithData() {
        List<Order> orders = serviceClass.orderListByUser("Munson");
        assertNotNull(orders);
        assertFalse(orders.isEmpty());
        assertEquals(1, orders.size());
        assertEquals("Bowlerama Lanes Iowa", orders.get(0).getItem().getName());
    }

    @Test
    @Transactional
    @Sql(statements = {
        "delete from t_orders",
        "delete from t_items",
        "delete from t_users",
        "insert into t_users (user_name, user_prop) values ('Munson', 15)"
    })
    public void testOrderListByUserWithoutData() {
        List<Order> orders = serviceClass.orderListByUser("Munson");
        assertNotNull(orders);
        assertTrue(orders.isEmpty());
    }
}