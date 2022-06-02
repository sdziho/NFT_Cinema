// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Token is ERC721 {
  struct Film{
    string ime;
    uint sjediste;
  }
  Film[] public karte;
  mapping(string=>bool[50]) public slobodno;
  constructor()  ERC721("Cinema Movie Token", "CMT") public {
    
  }
  function mint(string memory film, uint sjediste)public {
    require(sjediste<=50);
    require(!slobodno[film][sjediste]);
    karte.push(Film(film,sjediste));
    slobodno[film][sjediste]=true;
    _mint(msg.sender,sjediste);

  }
	
}