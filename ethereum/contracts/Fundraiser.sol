// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;

contract Fundraiser {
    struct Request {
        string name;
        string description;
        address recipient;
        address requestManager;
        uint value;
        uint donated;
        bool spam;
        bool legit;
        bool completed;
    }

    address public manager;
    mapping(address => bool) public verifiers;
    mapping(address => bool) public spammers;
    Request[] public requests;

    constructor() {
        manager = msg.sender;
    }

    function addVerifier(address verifier) public {
        require(msg.sender == manager, "Only contract manager can set verifier.");
        require(!verifiers[verifier], "Requested verifier is already included.");

        verifiers[verifier] = true;
    }

    function raiseMeFund(
        string memory name,
        string memory description,
        address recipient,
        uint value
    ) external {
        require(!spammers[msg.sender], "Suspicious activity detected!");

        Request memory newRequest = Request({
            name: name,
            description: description,
            recipient: recipient,
            requestManager: msg.sender,
            value: value,
            donated: 0,
            spam: false,
            legit: false,
            completed: false
        });

        requests.push(newRequest);
    }

    function verifyRequest(uint index, string memory status) external {
        require(verifiers[msg.sender], "You're not marked as a verifier!");
        
        Request storage request = requests[index];

        require(!request.spam, "Request is already marked as spam.");
        require(!request.legit, "Request is already marked as legit.");
        
        if(keccak256(abi.encodePacked(status)) == keccak256(abi.encodePacked('legit'))) {
            request.legit = true;
        } else if (keccak256(abi.encodePacked(status)) == keccak256(abi.encodePacked('spam'))) {
            request.spam = true;
            spammers[request.requestManager] = true;
        }
    }

    function getRequestCount() public view returns (uint) {
        return requests.length;
    }

    function sendHelp(uint index) external payable {
        Request storage request = requests[index];

        require(!request.spam, "Request is marked as spam.");
        require(!spammers[request.requestManager], "Requestor is marked as spam.");
        require(!request.completed, "Fund request already fulfilled.");

        request.donated += msg.value;
        if(request.donated >= request.value) {
            request.completed = true;
        }

        payable(request.recipient).transfer(msg.value);
    }
}