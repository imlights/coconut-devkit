//
// Created by lights on 6/19/19.
//

#ifndef UNTITLED_TURNBASED_RENDERER_H
#define UNTITLED_TURNBASED_RENDERER_H

#include "oxygine-framework.h"
#include <functional>

using namespace oxygine;

class MapEditorRenderer
{
public:
    MapEditorRenderer();
    void preinit();
    void init();
    void destroy();
    void update();
    void flush();
protected:
    Resources StaticResources;
    Resources TilesetResources;
};


#endif //UNTITLED_TURNBASED_RENDERER_H
