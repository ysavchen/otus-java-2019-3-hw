package com.mycompany.with_visitor.types;

import com.mycompany.with_visitor.base.TraversedField;
import com.mycompany.with_visitor.base.Visitor;

import java.lang.reflect.Field;

public class TraversedObject extends TraversedField {

    private final Object object;

    public TraversedObject(Field field, Object object) {
        super(field);
        this.object = object;
    }

    public Object getObject() {
        return object;
    }

    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
}