
/**
 * Instrucciones:
 * 
 *  - Crea un repo privado compartido sólo con dfleta en GitHub.
 *  - Realiza un commit al pasar cada caso test.
 *  - Sin este commit tras cada caso, no corrijo el examen.
 */

package sas.sdet.techtest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Arrays;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import sas.sdet.techtest.repository.NotEnoughProException;
import sas.sdet.techtest.repository.RepositoryClass;
import sas.sdet.techtest.service.ServiceClass;
import sas.sdet.techtest.domain.Order;
import sas.sdet.techtest.domain.Tournament;
import sas.sdet.techtest.domain.User;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;

import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * This is an application that manages a database of a bowling league or season, with the users of the service and tournaments.
 * bowling league or season, with the users of the service and the available tournaments (items).
 * available (items). The users make subscriptions (orders) to the * service to register for the championships.
 * Service to register for tournaments.
 * @RunWith(SpringRunner.class)
 * @SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
 * @Sql(statements = { "delete from t_ordenes", "delete from t_items", "delete from t_users",
 * 		"insert into t_users (user_name, user_prop) values ('Munson', 15)",
 * 		"insert into t_users (user_name, user_prop) values ('McCracken', 100)",
 * 		"insert into t_items (item_name, item_prop, item_type) values ('Murfreesboro Strike and Spare', 20, 'Torneo')",
 * 		"insert into t_items (item_name, item_prop, item_type) values ('Bowlerama Lanes Iowa', 7, 'Torneo')",
 * 		"insert into t_ordenes (ord_id, ord_user, ord_item) values (1,'Munson','Bowlerama Lanes Iowa')", })
 */


