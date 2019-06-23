//
// Created by lights on 6/19/19.
//

#ifndef UNTITLED_TURNBASED_MAPSTATE_H
#define UNTITLED_TURNBASED_MAPSTATE_H

#include <map>
#include <string>
#include "Lighting.h"
#include "Sounds.h"

struct MapState
{
    MapState(std::string n, std::string f, std::string t)
        : MetaData.Name(n), MetaData.FilePath(f), MetaData.Tileset(t), MetaData.Version(1);
    std::map<std::pair<int, int>, int> Tiles;
    std::map<std::pair<int, int>, Light> Lights;
    std::map<std::pair<int, int>, Sound> Sounds;
    struct
    {
        std::string Name;
        std::string FilePath;
        std::string Tileset;
        int Version {};
    } MetaData;
};

MapState::MapState(std::string n, std::string f, std::string t)
{

}


#endif //UNTITLED_TURNBASED_MAPSTATE_H
