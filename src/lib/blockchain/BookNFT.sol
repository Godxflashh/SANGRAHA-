// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BookNFT is ERC721, Ownable {
    struct Book {
        string title;
        string author;
        string ipfsHash;
    }

    mapping(uint256 => Book) public books;
    uint256 private _nextTokenId;

    constructor() ERC721("SangrahaBook", "SBOOK") {}

    function mintBook(
        address to,
        string memory title,
        string memory author,
        string memory ipfsHash
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        books[tokenId] = Book(title, author, ipfsHash);
        return tokenId;
    }

    function getBook(uint256 tokenId) public view returns (Book memory) {
        return books[tokenId];
    }
}