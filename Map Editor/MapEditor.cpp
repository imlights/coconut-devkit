//
// Created by lights on 6/19/19.
//

#include "MapEditor.h"

void MapEditor::SetTile(std::pair<int, int> Coords, int TileId)
{
    if (!ready) return;
    loadedMap.Tiles[Coords] = TileId;
}
