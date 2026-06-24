# AST-101: Asterisk PBX Foundations Lab

## Lab status

**Status:** Available  
**Level:** Beginner  
**Duration:** 90 minutes  
**Track:** VoIP & PBX  
**Access mode:** Guided lab  
**Provider:** Skunkworks Academy  

## Lab purpose

This lab introduces learners to the core operational concepts of an Asterisk PBX environment. Learners will explore the purpose of a PBX, inspect a basic Asterisk-style configuration model, define simple extensions, and validate expected call-flow logic.

This is designed as the first hands-on lab in the Skunkworks Academy VoIP and PBX learning path.

## Learning objectives

By the end of this lab, the learner should be able to:

1. Explain the role of Asterisk in a VoIP/PBX environment.
2. Identify the purpose of extensions, dial plans and SIP endpoints.
3. Read a simple PBX configuration structure.
4. Create a basic extension plan.
5. Validate expected call-routing behaviour.
6. Capture technical evidence for instructor review.

## Scenario

Skunkworks Academy is preparing a small internal PBX system for a training team. The system needs three internal extensions:

| User | Extension | Purpose |
|---|---:|---|
| Reception | 1000 | Main inbound contact point |
| Instructor Desk | 1001 | Instructor support |
| Lab Support | 1002 | Learner support during practical sessions |

Your task is to model the extension plan, define basic call-routing logic, and document how the PBX should route calls between these users.

## Prerequisites

Learners should have basic familiarity with:

- IP networking fundamentals
- Linux command-line basics
- Text-file editing
- VoIP terminology such as SIP, endpoint, extension and dial plan

## Lab environment

The first version of this lab may be completed as a guided design and configuration-reading lab. Later versions can be connected to a live Asterisk VM, container or browser terminal.

Recommended future runtime targets:

- Ubuntu Server VM
- Asterisk installed from package repository
- Browser SSH or Guacamole session
- Isolated learner network
- Disposable lab credentials

## Estimated timing

| Section | Time |
|---|---:|
| Orientation | 10 min |
| PBX concepts | 10 min |
| Extension design | 15 min |
| Dial-plan logic | 25 min |
| Validation | 15 min |
| Evidence submission | 15 min |

## Task 1: Understand the PBX requirement

Read the scenario and answer:

1. What problem is the PBX solving?
2. Why do internal users need short extension numbers?
3. What is the difference between a user, an endpoint and an extension?
4. Why should lab support have a dedicated extension?

### Expected outcome

The learner can explain that the PBX provides internal call routing and helps separate user identity, endpoint registration and dial-plan logic.

## Task 2: Create the extension inventory

Create a table in your lab notes with the following fields:

| Field | Description |
|---|---|
| Extension | Internal number |
| Display name | Human-readable user name |
| Department | Function or team |
| Call purpose | Why the extension exists |
| Priority | Normal, support or critical |

Use this extension inventory:

| Extension | Display name | Department | Call purpose | Priority |
|---:|---|---|---|---|
| 1000 | Reception | Front Desk | Main internal contact point | Critical |
| 1001 | Instructor Desk | Training | Instructor support | Normal |
| 1002 | Lab Support | Technical Support | Learner lab support | Support |

### Expected outcome

The learner has a simple extension register that can later be translated into Asterisk endpoint and dial-plan configuration.

## Task 3: Define dial-plan behaviour

Create a simple call-routing rule set:

```text
When a user dials 1000, route the call to Reception.
When a user dials 1001, route the call to Instructor Desk.
When a user dials 1002, route the call to Lab Support.
When a user dials an unknown extension, reject the call or play an invalid-extension message.

Then write the expected call flow in this format:

Caller dials extension -> PBX checks dial plan -> PBX routes to endpoint -> Endpoint rings -> Call is answered or times out
Expected outcome

The learner understands that Asterisk uses dial-plan logic to decide what happens after a number is dialled.

Task 4: Draft sample configuration logic

Use the structure below as a conceptual model.

[internal]
exten => 1000,1,Dial(PJSIP/reception,20)
exten => 1001,1,Dial(PJSIP/instructor-desk,20)
exten => 1002,1,Dial(PJSIP/lab-support,20)
exten => _X.,1,Playback(invalid)
exten => _X.,2,Hangup()

Answer these questions:

What does exten => 1000 represent?
What does Dial(PJSIP/reception,20) attempt to do?
Why is there a rule for unknown extensions?
What could happen if invalid dialled numbers are not handled?
Expected outcome

The learner can interpret the basic shape of an Asterisk dial-plan entry.

Task 5: Validate expected routing

Complete this validation table:

TestDialled numberExpected resultPass/Fail
11000Reception rings
21001Instructor Desk rings
31002Lab Support rings
49999Invalid extension handling occurs
Expected outcome

The learner can validate the design using expected outcomes before working with a live PBX.

Task 6: Evidence submission

Submit the following evidence:

Completed extension inventory.
Written call-flow explanation.
Sample dial-plan logic.
Completed validation table.
Short reflection: "What is the most important operational risk in a PBX lab environment?"
Instructor review rubric
CriteriaWeightEvidence
Extension inventory accuracy20%Correct extension table
Dial-plan understanding30%Correct interpretation of routing logic
Validation quality25%Completed validation table
Operational awareness15%Risk reflection
Presentation and clarity10%Clear, readable submission
Stretch challenge

Add a fourth extension:

UserExtension
Security Desk1003

Then update:

Extension inventory
Dial-plan logic
Validation table
Cleanup

For this guided version, no live infrastructure cleanup is required.

For future live-lab versions, learners must:

Log out of the PBX server.
Stop any test softphones.
Remove temporary credentials.
Confirm the lab instance is reset or destroyed.
Submission format

Submit your evidence as one of the following:

Markdown file
PDF export
GitHub issue comment
Portal evidence upload, once enabled

Recommended filename:

AST-101-evidence-learner-name.md
Badge mapping

Successful completion maps to:

Asterisk PBX Foundations
Next lab

Recommended next lab:

AST-102: Installing and Configuring Asterisk

