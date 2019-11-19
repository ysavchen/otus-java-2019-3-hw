package com.mycompany.mutiprocess.database.handlers;

import com.mycompany.mutiprocess.database.DBService;
import com.mycompany.mutiprocess.database.domain.User;
import com.mycompany.mutiprocess.message_system.Message;
import com.mycompany.mutiprocess.message_system.MessageHandler;
import com.mycompany.mutiprocess.message_system.common.Serializers;
import lombok.extern.slf4j.Slf4j;

import java.util.Optional;

@Slf4j
public class StoreUserRequestHandler implements MessageHandler {

    private final DBService dbService;
    private static final String RESPONSE_MSG_TYPE = "StoreUser";

    public StoreUserRequestHandler(DBService dbService) {
        this.dbService = dbService;
    }

    @Override
    public Optional<Message> handle(Message msg) {
        User user = Serializers.deserialize(msg.getPayload(), User.class);
        String info = storeUser(user);
        return Optional.of(new Message(msg.getTo(), msg.getFrom(), Optional.of(msg.getId()), RESPONSE_MSG_TYPE, Serializers.serialize(info)));
    }

    private String storeUser(User user) {
        String message;
        try {
            long id = dbService.saveUser(user);

            message = "User is saved with id = " + id;
        } catch (Exception ex) {
            logger.error("Error: " + ex);
            message = "User is not saved. \n Error: " + ex.getCause();
        }
        return message;
    }
}
