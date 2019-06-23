//
// Created by lights on 6/19/19.
//

#ifndef UNTITLED_TURNBASED_MAPEDITOR_H
#define UNTITLED_TURNBASED_MAPEDITOR_H

#include "MapState.h"

class MapEditor
{
public:
    MapEditor();
    ~MapEditor();
protected:
    bool ready = false;
    MapState loadedMap;
    struct View
    {

    };
    void SetTile(std::pair<int, int>, int);

    // Operations
    void NewMap();
    void LoadMapFromRaw();
    void LoadMapFromJSON();
    void ExportRaw();
    void ExportJSON();
};


#endif //UNTITLED_TURNBASED_MAPEDITOR_H
